import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { use, useContext, useEffect } from "react";

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
    logo: '/icons/google.svg',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
  },
  'OAuth2.0': {
    logo: '/icons/oauth.svg',
    bgColor: 'bg-gray-800',
    textColor: 'text-white',
  },
  Twitter: {
    logo: '/icons/twitter.svg',
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
  },
};

type Provider = 'Google' | 'OAuth2.0' | 'Twitter';

const LoginButton = ({ provider,...rest }: {provider: Provider}) => {
  const router = useRouter();
  const { logo, bgColor, textColor } = providerDetails[provider];
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext not found");
  }

  useEffect(() => {
    if (context.isAuthenticated) {
      router.push('/notes');
    }
  }, [context]);
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
