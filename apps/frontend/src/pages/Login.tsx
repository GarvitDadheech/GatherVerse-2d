import { useState } from "react";
import { Eye, EyeOff, Heart } from "lucide-react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { Modal } from "../components/Modal";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Background>
      <Modal
        title={
          <>
            <h1 className="text-3xl font-bold text-white mb-2 font-['Comic_Sans_MS']">
              {isLogin ? "Welcome Back! ✨" : "Join the Fun! 🎮"}
            </h1>
            <p className="text-[#4fd1c5] font-['Comic_Sans_MS']">
              {isLogin
                ? "Let's continue the adventure!"
                : "Create your magical account!"}
            </p>
          </>
        }
      >
        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setIsLogin(true)}
            variant={isLogin ? "primary" : "secondary"}
            className={`flex-1 ${isLogin ? "transform -translate-y-1" : ""}`}
          >
            <span className="font-['Comic_Sans_MS']">Sign In</span>
          </Button>
          <Button
            onClick={() => setIsLogin(false)}
            variant={!isLogin ? "primary" : "secondary"}
            className={`flex-1 ${!isLogin ? "transform -translate-y-1" : ""}`}
          >
            <span className="font-['Comic_Sans_MS']">Sign Up</span>
          </Button>
        </div>
        <form className="space-y-4">
          <InputBox
            type="text"
            placeholder="Username"
            className="font-['Comic_Sans_MS']"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            type="email"
            placeholder="Email"
            className="font-['Comic_Sans_MS']"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="font-['Comic_Sans_MS'] pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="relative">
            <InputBox
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="font-['Comic_Sans_MS'] pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button
            className="font-['Comic_Sans_MS'] group"
            onClick={() => {
              /* handle click event */
            }}
          >
            <span className="relative z-10">
              {isLogin ? "Login" : "Create Account"}
            </span>
            <Heart
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              size={20}
            />
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t-2 border-[#374151]"></div>
          <span className="px-4 text-gray-400 font-['Comic_Sans_MS']">or</span>
          <div className="flex-1 border-t-2 border-[#374151]"></div>
        </div>

        {/* Google Sign In */}
        <div className="flex justify-center">
          <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              theme="filled_black"
              shape="pill"
              size="large"
            />
          </GoogleOAuthProvider>
        </div>
      </Modal>
    </Background>
  );
};

export default LoginPage;
