let handlefail = function (err) {
  console.log(err);
};

let numPeople = 0;
let people = [];

function addVideoStream(streamId) {
  console.log();
  let remoteContainer = document.getElementById("remoteStream");
  let streamDiv = document.createElement("div");
  streamDiv.id = streamId;
  // streamDiv.style.transform = "rotateY(180deg)";
  streamDiv.style.height = "150px";
  remoteContainer.style;
  remoteContainer.appendChild(streamDiv);
  numPeople++;
}

function addVideoStream2(streamId) {
  console.log();
  let remoteContainer = document.getElementById("remoteStream2");
  let streamDiv = document.createElement("div");
  streamDiv.id = streamId;
  // streamDiv.style.transform = "rotateY(180deg)";
  streamDiv.style.height = "150px";
  remoteContainer.style;
  remoteContainer.appendChild(streamDiv);
  numPeople++;
}

function addVideoStream3(streamId) {
  console.log();
  let remoteContainer = document.getElementById("remoteStream3");
  let streamDiv = document.createElement("div");
  streamDiv.id = streamId;
  // streamDiv.style.transform = "rotateY(180deg)";
  streamDiv.style.height = "150px";
  remoteContainer.style;
  remoteContainer.appendChild(streamDiv);
  numPeople++;
}

document.getElementById("join").onclick = function () {
  let channelName = document.getElementById("channelName").value;
  let Username = document.getElementById("username").value;
  people.push(Username);
  let appId = "53ca517bfccd44f388878863903c1dc8";

  let client = AgoraRTC.createClient({
    mode: "live",
    codec: "h264",
  });

  client.init(
    appId,
    () => console.log("AgoraRTC Client Connected"),
    handlefail
  );

  client.join(null, channelName, Username, () => {
    var localStream = AgoraRTC.createStream({
      video: true,
      audio: true,
    });

    localStream.init(function () {
      localStream.play("SelfStream");
      console.log(`App id: ${appId}\nChannel id: ${channelName}`);
      client.publish(localStream);
    });
  });

  client.on("stream-added", function (evt) {
    console.log("Added Stream");
    client.subscribe(evt.stream, handlefail);
  });

  client.on("stream-subscribed", function (evt) {
    console.log("Subscribed Stream");
    let stream = evt.stream;
    console.log(people);
    if (numPeople == 0) {
      addVideoStream(stream.getId());
      stream.play(stream.getId());
    } else if (numPeople == 1) {
      addVideoStream2(stream.getId());
      stream.play(stream.getId());
    } else if (numPeople == 2) {
      addVideoStream3(stream.getId());
      stream.play(stream.getId());
    } else {
      console.log("Max Participants are filled");
    }
  });
};
