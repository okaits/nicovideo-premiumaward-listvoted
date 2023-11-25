chrome.runtime.onMessage.addListener((req, _, res) => {
    if (req.message == "req_videos") {
        resdata = localStorage.getItem("votedVideos");
        res(resdata);
    } else if (req.message == "search_video") {
        videotitle = req.videotitle;
        searchbox = document.getElementById("lo-Search_Form-Keyword-Input");
        searchbox.value = videotitle;
        searchbutton = document.querySelector("button.lo-Search_Form-Keyword-Btn");
        searchbutton.click();
        document.href = "#search"
    };
});