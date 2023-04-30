
var Streams = [];
function genratebarrertoken() {
    const options = {
        method: 'POST',
        url: 'https://ws.api.video/auth/api-key',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        data: { apiKey: 'l3reAjOQcsvGjU3gBVtIF8Za9bJcHhlWKEETUrmanYm' }
    };
    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            localStorage.setItem("token", response.data.access_token)
        })
        .catch(function (error) {
            console.error(error);
        });
}
genratebarrertoken();

var streamResult = [];
async function getstream() {
    var token = localStorage.getItem("token")
    var data = await fetch(`https://sandbox.api.video/videos`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            'authorization': `Basic VUJFSW5pcHd1akVxNVlVUXZTVExBTDZ4S0pZRGtES1dPZmtQRmVGUVBtUDo=`
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
    })
    var Response = await data.json();
    streamResult = Response.data;
    displaystream()
}
getstream();

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
// make constructor
function Straming(ID, backgroundcover, itemname, itemdescription, releaseyear, runningtime, quility, age, country, genra, photo, type, video) {
    this.ID = ID
    this.backgroundcover = backgroundcover;
    this.itemname = itemname;
    this.itemdescription = itemdescription;
    this.releaseyear = releaseyear;
    this.runningtime = runningtime;
    this.quility = quility;
    this.age = age;
    this.genra = genra;
    this.country = country
    this.photo = photo;
    this.type = type;
    this.video = video;
    Streams.push(this);
}
async function insertbyvideoid(videoid, file) {
    const fileUploader = document.getElementById('Coverimage');
    const fileUploader2 = document.getElementById('file-uploader2');
    var Coverimage = URL.createObjectURL(fileUploader.files[0])
    let storageref=firebase.storage().ref("images/"+fileUploader.files[0].name)
     var uploadtask= storageref.put(fileUploader.files[0]);
      let storageref2=firebase.storage().ref("images/"+fileUploader2.files[0].name)
     
      uploadtask.snapshot.ref.getDownloadURL().then(function(url){
        Coverimage=url
        console.log(Coverimage);
      })
     
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var relaseyear = document.getElementById('relaseyear').value;
    var runningtime = document.getElementById("runningtime").value;
    var quility = document.getElementById("quility").selectedOptions[0].value;
    var age = document.getElementById("age").value;
    var country = document.getElementById("country").selectedOptions[0].value;
    var genres = document.getElementById("genres").selectedOptions[0].value;
    var photos = URL.createObjectURL(fileUploader2.files[0])
    var type;
    var movuebtn = document.getElementById("movuebtn")
    var tvseries = document.getElementById("tvseries");
    if (movuebtn.checked == true) {
        type = document.getElementById("movuebtn").value;

    }
    else (tvseries.checked == true)
    {
        type = document.getElementById("tvseries").value
    }

    var dbref = firebase.database().ref();
    var movies = dbref.child("Movies");
    var token = localStorage.getItem("token")

    var base64file = await toBase64(file);
    console.log(base64file);
    var steamobj;
    var formdata = new FormData();
    formdata.append("file", file);
    
    const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        url: `https://sandbox.api.video/videos/${videoid}/source`,
        headers: {
            'authorization': `Basic VUJFSW5pcHd1akVxNVlVUXZTVExBTDZ4S0pZRGtES1dPZmtQRmVGUVBtUDo=`
        },
        
        data: formdata
    };
    $("#loading").addClass("loading");

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data.assets.mp4);
            if (localStorage.getItem("streamsitem") != null) {
                var streamitemscount = JSON.parse(localStorage.getItem("streamsitem")).length;
                if (streamitemscount > 0) {
                    var steamobject = JSON.parse(localStorage.getItem("streamsitem"));
                    for (var i = 0; i <= steamobject.length; i++) {
                        Streams.push(steamobject[i])
                    }
                    movies.push({
                        "ID": response.data.videoId,
                        "backgroundcover": Coverimage,
                        "itemname": title,
                        "itemdescription": description,
                        "releaseyear": relaseyear,
                        "runningtime": runningtime,
                        "quility":quility,
                        "age": age,
                        "genra": genres,
                        "country": country,
                        "photo": photos,
                        "type": type,
                        "video": response.data.assets.iframe
                    })
                    steamobj = new Straming(response.data.videoId, Coverimage, title, description, relaseyear, runningtime, quility, age, country, genres, photos, type, response.data.assets.iframe);
                }
            }
            else {
                  movies.push({
                    "ID": response.data.videoId,
                    "backgroundcover": Coverimage,
                    "itemname": title,
                    "itemdescription": description,
                    "releaseyear": relaseyear,
                    "runningtime": runningtime,
                    "quility":quility,
                    "age": age,
                    "genra": genres,
                    "country": country,
                    "photo": photos,
                    "type": type,
                    "video": response.data.assets.iframe
                })
                  steamobj = new Straming(response.data.videoId, Coverimage, title, description, relaseyear, runningtime, quility, age, country, genres, photos, type, response.data.assets.iframe);
            }
            const streamResult = Streams.filter(item => item !== null);
            var steamString = JSON.stringify(streamResult);
            localStorage.setItem('streamsitem', steamString);
            console.log(steamobj);
            setTimeout(() => {
                $("#loading").addClass("SlowFadeOutLoader");

            }, 5000);
             document.getElementById("title").value="";
 document.getElementById("description").value="";
     document.getElementById('relaseyear').value="";
    document.getElementById("runningtime").value="";
     document.getElementById("quility").selectedOptions[0].value="";
     document.getElementById("age").value="";
      document.getElementById("country").selectedOptions[0].value="";
        $(".uploader").removeAttr("style");         
            setTimeout(() => {
                Swal.fire(
                    'success!',
                    'item has been added to home page',
                    'success'
                )

            }, 7000);



        })
        .catch(function (error) {
            setTimeout(() => {
                $("#loading").addClass("SlowFadeOutLoader");

            }, 5000);

            console.error(error);
        });


}
function insertstream(file) {
    var token = localStorage.getItem("token")
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("content-type", "application/json");
    myHeaders.append("authorization", `Basic VUJFSW5pcHd1akVxNVlVUXZTVExBTDZ4S0pZRGtES1dPZmtQRmVGUVBtUDo=`);
    var raw = JSON.stringify({
        "public": true,
        "panoramic": false,
        "mp4Support": true,
        "title": file.name,
        "description": "ASDASD"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://sandbox.api.video/videos", requestOptions)
        .then(response => response.text())
        .then(result => insertbyvideoid(JSON.parse(result).videoId, file))
        .catch(error => console.log('error', error));
}
function displaystream() {
    var url = new URL(window.location.href);
    const params = new URL(url).searchParams;
    var videoid = params.get('videoid');

    var data = `<div class="row">`;
    var searchresultdiv = document.getElementById("stream");
    var title = document.getElementById("BookingMovieTitle");
    for (var i = 0; i < streamResult.length; i++) {
console.log(streamResult[i].videoId)
        if(streamResult[i].videoId==videoid)
        {
            title.innerHTML = streamResult[i].title

            var iframe = streamResult[i].assets.iframe;
            if (streamResult[i] != undefined) {
                data = `<div class="col-lg-12 col-12">
                <div class="stream-item text-center">
                ${iframe}
                </div>
                </div>`
            }
        }
       

    }
    data += "</div>"
    searchresultdiv.innerHTML = "";
    searchresultdiv.innerHTML = data
}
var el = document.getElementById('file-uploader2');
var form = document.getElementById('myform');
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var filename = el.files[0];


    insertstream(filename)
})
