import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white mb-12">Diary Blog</h1>
        <div className="space-y-4">
          <LoginButton provider="Google" />
          <LoginButton provider="OAuth2.0" />
          <LoginButton provider="Twitter" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


const providerDetails = {
  Google: {
    logo: 'https://res.cloudinary.com/nowo-ltd/image/upload/v1732362240/TOKENTIX/Google_Icons-09-512_xxu69a.png',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
  },
  'OAuth2.0': {
    logo: 'https://res.cloudinary.com/nowo-ltd/image/upload/v1732362429/TOKENTIX/1_St3fqJKbsSZD_eAhE5HtAw_anqw5c.png',
    bgColor: 'bg-gray-800',
    textColor: 'text-white',
  },
  Twitter: {
    logo: 'https://res.cloudinary.com/nowo-ltd/image/upload/v1732362313/TOKENTIX/twitter-logo-2_srwnmo.svg',
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
  },
};

type Provider = 'Google' | 'OAuth2.0' | 'Twitter';

const LoginButton = ({ provider,...rest }: {provider: Provider}) => {
  const { logo, bgColor, textColor } = providerDetails[provider];
  const context = useContext(AuthContext);
  const handleLogin = async () => {
    try {
      switch (provider) {
        case 'OAuth2.0':
          context?.login();
          break;
      
        default:
          alert("Provider not implemented")
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  }
  return (
    <button
      {...rest}
      onClick={ handleLogin }
      className={`w-64 flex items-center justify-center py-3 px-6 rounded-full shadow-lg hover:opacity-90 transition-opacity duration-300 ${bgColor}`}
    >
      <img src={logo} className="w-6 h-6 mr-3" />
      <span className={`font-semibold ${textColor}`}>Login with {provider}</span>
    </button>
  );
};
