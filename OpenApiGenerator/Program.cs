using System;
using System.Collections.Concurrent;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Readers;

namespace OpenApiGenerator {
    public class Program {
        public static void Main(string[] args) {
            if (args.Length < 2 || args.Length > 3) {
                Console.WriteLine("Usage: OpenApiGenerator <openapi.yaml URL> <destination directory> [headline prefix - default ###]");
                return;
            }

            var oasDoc = new UriBuilder(args[0]);
            var oasRoot = new UriBuilder(oasDoc.Uri);
            oasRoot.Path = oasRoot.Path.Substring(0, oasRoot.Path.LastIndexOf("/") + 1);
            var outputRoot = args[1];
            var baseHeading = args.Length > 2 ? args[2] : "###";

            if (!Directory.Exists(outputRoot))
                Directory.CreateDirectory(outputRoot);
            var hc = new HttpClient {BaseAddress = oasRoot.Uri};
            var docCache = new ConcurrentDictionary<string, OpenApiDocument>();
            Func<string, OpenApiDocument> docLoader = (n) => docCache.GetOrAdd(n, (nn) => new OpenApiStreamReader().Read(hc.GetStreamAsync(nn).Result, out var err));
            var document = docLoader(oasDoc.Uri.ToString());
            foreach (var (path, pathSpec) in document.Paths)
            foreach (var (verb, op) in pathSpec.Operations) {
                if (op.Deprecated) continue;
                var file = Path.Combine(outputRoot, op.OperationId + ".md");
                using (var writer = new StreamWriter(file, false, new UTF8Encoding(false))) {
                    writer.WriteLine($"{baseHeading}# {op.Summary}");
                    writer.WriteLine($"`{verb.ToString().ToUpper()} {path}`");
                    writer.WriteLine();
                    if (!string.IsNullOrEmpty(op.Description))
                        writer.WriteLine(op.Description);

                    if (op.Parameters != null && op.Parameters.Count > 0) {
                        writer.WriteLine($"{baseHeading}## Parameters in path and query");
                        writer.WriteLine("|Name|Description|");
                        writer.WriteLine("|-|-|");
                        foreach (var p in op.Parameters) {
                            writer.WriteLine($"|<Badge>{p.In?.ToString()}</Badge> {p.Name}|{(p.Required ? "<Badge>REQUIRED</Badge> " : "")}{p.Description}|");
                        }
                    }

                    if (op.RequestBody?.Content != null && op.RequestBody.Content.TryGetValue("application/json", out var bodyDef)) {
                        writer.WriteLine($"{baseHeading}## Parameters in request body");
                        writer.WriteLine("|Name|Type|Description|");
                        writer.WriteLine("|-|-|-|");
                        DescribeSchema(writer, bodyDef.Schema, docLoader);
                    }

                    if (op.Responses.TryGetValue("200", out var resp)) {
                        writer.WriteLine($"{baseHeading}## Response format");
                        writer.WriteLine("|Name|Type|Description|");
                        writer.WriteLine("|-|-|-|");
                        if (resp.Content.TryGetValue("application/json", out var respBodyDef))
                            DescribeSchema(writer, respBodyDef.Schema, docLoader);
                    }
                }
            }
        }

        private static void DescribeSchema(StreamWriter writer, OpenApiSchema schema, Func<string, OpenApiDocument> docLoader, string namePrefix = null, bool noOut=false) {
            if (schema.Reference != null && schema.Type == null) {
                if (schema.Reference.IsExternal) {
                    var doc=docLoader(schema.Reference.ExternalResource);
                    if (doc?.Components?.Schemas != null && doc.Components.Schemas.TryGetValue(schema.Reference.Id.Split("/").Last(), out var extSchema)) {
                        DescribeSchema(writer, extSchema, docLoader, namePrefix, noOut);
                    } else {
                        writer.WriteLine($"|*unresolvable schema reference*|{schema.Reference.ExternalResource}{schema.Reference.Id}||");
                    }
                } else {
                    writer.WriteLine($"|*unresolvable schema reference*|{schema.Reference.ExternalResource}{schema.Reference.Id}||");
                }
            } else if (schema.AllOf?.Any() ?? false)
                foreach (var subSchema in schema.AllOf)
                    DescribeSchema(writer, subSchema, docLoader, namePrefix);
            else if (schema.AnyOf?.Any() ?? false)
                foreach (var subSchema in schema.AnyOf)
                    DescribeSchema(writer, subSchema, docLoader, namePrefix);
            else if (schema.OneOf?.Any() ?? false)
                foreach (var subSchema in schema.OneOf)
                    DescribeSchema(writer, subSchema, docLoader, namePrefix);
            else {
                if (namePrefix != null && !noOut)
                    writer.WriteLine($"|{namePrefix}|{schema.Type}|{schema.Description}|");
                if (schema.Type == "object" && schema.Properties != null) {
                    foreach (var (propName, propSchema) in schema.Properties) {
                        DescribeSchema(writer, propSchema, docLoader, (namePrefix != null ? namePrefix + "." : "") + propName);
                    }
                }else if (schema.Type == "array" && schema.Items != null)
                    DescribeSchema(writer, schema.Items, docLoader, namePrefix, true);
            }
        }
    }
}