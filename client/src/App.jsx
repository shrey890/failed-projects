import { useState } from "react";
import axios from "axios";

const App = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const registerHandler = async () => {
        try {
            const response = await axios.post("register", {
                name,
                password,
            });
            if (response.status === 201) {
                console.log("Register successful!");
            } else {
                console.error("Register failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="username"
            />
            <br />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />
            <br />
            <button onClick={registerHandler}>Register</button>
        </div>
    );
};

export default App;
