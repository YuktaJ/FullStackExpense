import axios from "axios";

const DownloadButton = () => {
  async function downloadFile() {
    try {
      let token = localStorage.getItem("token");
      let res = await axios.get("http://localhost:3000/files", {
        headers: { Authorization: token },
      });
      let a = document.createElement("a");
      a.href = res.data.fileUrl;
      a.download = res.data.fileName;
      a.click();
    } catch (error) {
      console.log(error, "Something went wrong.");
    }
  }
  return (
    <>
      <center>
        <h5 style={{ marginTop: "4%" }}>
          Click here to download latest expense record.
        </h5>
        <br></br>
        <button className="btn btn-primary" onClick={downloadFile}>
          Download File
        </button>
      </center>
    </>
  );
};
export default DownloadButton;
