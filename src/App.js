import "./App.css";
import FileUploader from "./components/FileUploader/FileUploader";

function App() {
    return (
        <div className="box">
            <h2 className="title">Upload your files here</h2>
            <FileUploader />
        </div>
    );
}

export default App;
