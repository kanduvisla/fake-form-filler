function populateForm(info, tab)
{
    chrome.tabs.sendMessage(tab.id, "populateForm");
}

chrome.contextMenus.create({
    "title": "Populate Form",
    "contexts": ["editable"],
    "onclick": populateForm
});
