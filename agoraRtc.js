let handlefail = function (err) {
  console.log(err);
};

let numPeople = 0;
let globalStream;
let isAudioMuted = false;
let isVidioMuted = false;

let appId = "5651306a1cb0492db118cfe643e8c9c4";

let client = AgoraRTC.createClient({
  mode: "live",
  codec: "h264",
});

client.init(appId, () => console.log("AgoraRTC Client Connected"), handlefail);

function removeMyVideoStream() {
  globalStream.stop();
}

function removeVideoStream(evt) {
  let stream = evt.stream;
  stream.stop();
  let remDiv = document.getElementById(stream.getId());
  remDiv.parentNode.removeChild(remDiv);
}

function addVideoStream(streamId) {
  let remoteContainer = document.getElementById("remoteStream");
  let streamDiv = document.createElement("div");
  streamDiv.id = streamId;
  // streamDiv.style.transform = "rotateY(180deg)";
  streamDiv.style.height = "305px";
  remoteContainer.style;
  remoteContainer.appendChild(streamDiv);
  document.getElementById("participants").innerHTML += ", " + streamId;
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
  document.getElementById("participants").innerHTML += ", " + streamId;
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
  document.getElementById("participants").innerHTML += ", " + streamId;
  numPeople++;
}

document.getElementById("leave").onclick = function () {
  client.leave(function () {
    console.log("Left!");
  }, handlefail);
  removeMyVideoStream();
};

document.getElementById("join").onclick = function () {
  let channelName = document.getElementById("channelName").value;
  let Username = document.getElementById("username").value;
  document.getElementById("participants").innerHTML = Username;

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

    globalStream = localStream;
  });

  client.on("stream-added", function (evt) {
    console.log("Added Stream");
    client.subscribe(evt.stream, handlefail);
  });

  client.on("stream-subscribed", function (evt) {
    console.log("Subscribed Stream");
    let stream = evt.stream;
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

  client.on("peer-leave", function (evt) {
    console.log("Peer has left");
    removeVideoStream(evt);
  });
};

document.getElementById("video-mute").onclick = function () {
  if (!isVidioMuted) {
    globalStream.muteVideo();
    isVidioMuted = true;
  } else {
    globalStream.unmuteVideo();
    isVidioMuted = false;
  }
};

document.getElementById("audio-mute").onclick = function () {
  if (!isAudioMuted) {
    globalStream.muteAudio();
    isAudioMuted = true;
  } else {
    globalStream.unmuteAudio();
    isAudioMuted = false;
  }
};
