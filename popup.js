document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: "req_videos"}, (item) => {
            fetch('https://site.nicovideo.jp/premiumaward/nominated.json')
                .then(res => res.json())
                .then(nominated_videos => {
                    votes_list = JSON.parse(item);
                    elem_list = document.getElementById("voted_video_list");
                    votes_list.reverse()
                    for (vote in votes_list) {
                        vote_videoid = votes_list[vote].videoId;
                        for (video in nominated_videos) {
                            if (nominated_videos[video]["id"] == vote_videoid) {
                                vote_videotitle = nominated_videos[video]["title"];
                                break;
                            };
                        };
                        vote_date = new Date(votes_list[vote].lastVotedDate);
                        elem_li = document.createElement("li");
                        elem_a  = document.createElement("a");
                        elem_a.setAttribute("data-videotitle", vote_videotitle)
                        elem_a.setAttribute("href", "#")
                        elem_a.addEventListener("click", (e) => {
                            chrome.tabs.query({active: true, currentWindow: true}, (tabs => {
                                chrome.tabs.sendMessage(tabs[0].id, {message: "search_video", videotitle: e.target.dataset.videotitle})
                            }));
                            e.preventDefault();
                        });
                        elem_a.innerHTML = vote_date.getFullYear() + "/" + String(vote_date.getMonth()).padStart(2, "0") + "/" + String(vote_date.getDate()).padStart(2, "0") + " " + String(vote_date.getHours()).padStart(2, "0") + ":" + String(vote_date.getMinutes()).padStart(2, "0") + ":" + String(vote_date.getSeconds()).padStart(2, "0") + " " + vote_videoid + " - " + vote_videotitle;
                        elem_li.appendChild(elem_a);
                        elem_list.appendChild(elem_li);
                    };
                })
        });
    });
});