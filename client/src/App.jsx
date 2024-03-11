// client/src/App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
	const [file, setFile] = useState(null);
	const [images, setImages] = useState([]);
	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};
	const handleUpload = async () => {
		const formData = new FormData();
		formData.append("image", file);
		await axios.post("http://localhost:5000/upload", formData);
		fetchImages();
	};
	const fetchImages = async () => {
		const response = await axios.get("http://localhost:5000/image");
		setImages(response.data);
	};
	return (
		<div>
			<input type="file" onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>
			<div>
				{images.map((image) => (
					<img
						key={image.id}
						src={`data:${image.mimetype};base64,${image.data.toString(
							"base64"
						)}`}
						alt="Uploaded"
					/>
				))}
			</div>
		</div>
	);
}
export default App;
