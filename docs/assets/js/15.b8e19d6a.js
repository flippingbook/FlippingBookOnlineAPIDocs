(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{213:function(t,e,v){"use strict";v.r(e);var i=v(0),_=Object(i.a)({},(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"tracked-link-entity-model"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#tracked-link-entity-model","aria-hidden":"true"}},[t._v("#")]),t._v(" "),v("code",[t._v("Tracked Link")]),t._v(" Entity Model")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("Property")]),t._v(" "),v("th",[t._v("Type")]),t._v(" "),v("th",[t._v("Description")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[v("code",[t._v("Id")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Link unique identifier.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Title")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Link title (visible only to link owner, not end-user).")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("State")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Link state. It may consist of any combination (comma separated) of the following values: "),v("code",[t._v("WithNewData")]),t._v(" - there is some 'unseen' statistics collected for the link; "),v("code",[t._v("WithoutNewData")]),t._v(" - there is no 'unseen' statistics for the link; "),v("code",[t._v("Active")]),t._v(" - link is active and enabled; "),v("code",[t._v("Deleted")]),t._v(" - link was deleted and unavailable to end-users (readers); "),v("code",[t._v("Expired")]),t._v(" - link's lifetime ended - it was not clicked before set expiration time.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("CreatedAt")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Link creation timestamp. ISO 8601 date format.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("UrlName")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Unique URL part for the link. To get full URL you should prefix it with "),v("code",[t._v("https://online.flippingbook.com/link/")]),t._v(" (for the default domain).")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("TriggerId")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Trigger identifier for the link.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("ShortStats")])]),t._v(" "),v("td",[t._v("object")]),t._v(" "),v("td",[t._v("View statistics for the link.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("ShortStats.FullStats")])]),t._v(" "),v("td",[t._v("object")]),t._v(" "),v("td",[t._v("Totals for the link.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("ShortStats.FullStats.LastViewedAt")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Date/time of last view, ISO 8601 format.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("ShortStats.FullStats.ViewDuration")])]),t._v(" "),v("td",[t._v("number")]),t._v(" "),v("td",[t._v("Total viewing time (seconds).")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("ShortStats.FullStats.Visits")])]),t._v(" "),v("td",[t._v("number")]),t._v(" "),v("td",[t._v("Total number of views.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("ShortStats.SinceLastUpdate")])]),t._v(" "),v("td",[t._v("object")]),t._v(" "),v("td",[t._v("Statistics accumulated from last 'seen' state.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("ShortStats.SinceLastUpdate.LastViewedAt")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Date/time of last view since last seen, ISO 8601 format.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("ShortStats.SinceLastUpdate.ViewDuration")])]),t._v(" "),v("td",[t._v("number")]),t._v(" "),v("td",[t._v("Viewing time (seconds) since last seen.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("ShortStats.SinceLastUpdate.Visits")])]),t._v(" "),v("td",[t._v("number")]),t._v(" "),v("td",[t._v("Number of views since last seen.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Publication")])]),t._v(" "),v("td",[t._v("object")]),t._v(" "),v("td",[t._v("Parent publication excerpt.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Publication.Id")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Parent publication identifier.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Publication.Id.Id")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Parent publication unique identifier.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Publication.Id.HashId")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Parent publication URL identifier.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Publication.Title")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Parent publication name.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Publication.Url")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Parent publication canonical URL.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Triggers")])]),t._v(" "),v("td",[t._v("object")]),t._v(" "),v("td",[t._v("Triggers for the link.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Triggers.OnView")])]),t._v(" "),v("td",[t._v("object")]),t._v(" "),v("td",[t._v("View trigger for the link.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Triggers.OnView.Enabled")])]),t._v(" "),v("td",[t._v("boolean")]),t._v(" "),v("td",[t._v("Is this trigger enabled.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Triggers.OnView.Amount")])]),t._v(" "),v("td",[t._v("number")]),t._v(" "),v("td",[t._v("How many times this trigger is allowed to fire.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Triggers.OnDownload")])]),t._v(" "),v("td",[t._v("object")]),t._v(" "),v("td",[t._v("Download trigger for the link.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Triggers.OnDownload.Enabled")])]),t._v(" "),v("td",[t._v("boolean")]),t._v(" "),v("td",[t._v("Is this trigger enabled.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Triggers.OnDownload.Amount")])]),t._v(" "),v("td",[t._v("number")]),t._v(" "),v("td",[t._v("How many times this trigger is allowed to fire.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Triggers.OnNotOpenedUntil")])]),t._v(" "),v("td",[t._v("object")]),t._v(" "),v("td",[t._v("Link not opened before trigger for the link.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Triggers.OnNotOpenedUntil.Enabled")])]),t._v(" "),v("td",[t._v("boolean")]),t._v(" "),v("td",[t._v("Is this trigger enabled.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Triggers.OnNotOpenedUntil.Until")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("When this trigger should fire.")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("Triggers.TriggerVia")])]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",[t._v("Trigger delivery method. Can be one of the following values: "),v("code",[t._v("Email")]),t._v(" - notify via email; "),v("code",[t._v("Zapier")]),t._v(" - notify via "),v("a",{attrs:{href:"https://zapier.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("zapier"),v("OutboundLink")],1),t._v(" integration.")])])])])])}),[],!1,null,null,null);e.default=_.exports}}]);