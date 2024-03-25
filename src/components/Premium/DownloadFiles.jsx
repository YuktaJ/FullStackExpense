import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";

const DownloadedFiles = () => {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(5);

  useEffect(() => {
    fetchDownloadedFiles();
  }, [currentPage]);

  const fetchDownloadedFiles = async () => {
    try {
      let token = localStorage.getItem("token");
      let res = await axios.get("http://localhost:3000/download-history", {
        headers: { Authorization: token },
      });
      console.log(res.data.files);
      setFiles(res.data.files);
    } catch (error) {
      console.log(error);
    }
  };

  // Logic to paginate files
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  return (
    <center style={{ marginTop: "9%" }}>
      <h5>Download History</h5>
      <br></br>
      <table style={{ width: "80%" }} class="table">
        <thead>
          <tr class="table-dark">
            <th scope="col">Sr</th>
            <th scope="col">Name</th>
            <th scope="col">Download</th>
          </tr>
        </thead>
        <tbody>
          {currentFiles.map((file, i) => (
            <tr class="table-warning">
              <th scope="row">{indexOfFirstFile + i + 1}</th>
              <td>{file.fileName}</td>
              <td>
                <a href={file.url}>
                  <IoMdDownload style={{ fontSize: "25px", color: "green" }} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div>
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn btn-outline-dark"
          >
            Previous
          </button>
        )}
        {currentPage < Math.ceil(files.length / filesPerPage) && (
          <span>
            {" "}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn btn-outline-dark"
            >
              Next
            </button>
          </span>
        )}
      </div>
    </center>
  );
};

export default DownloadedFiles;
