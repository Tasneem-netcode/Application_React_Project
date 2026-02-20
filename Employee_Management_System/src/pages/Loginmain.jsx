import LoginForm from "../components/Auth/LoginForm";
import LoginIllustration from "../components/Auth/LoginIllustration";

const Loginmain = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      {/* Main Card */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex overflow-hidden">

        {/* LEFT */}
        <div className="w-1/2 p-12">
          <LoginForm />
        </div>

        {/* RIGHT */}
        <div className="w-1/2 bg-[#E9F0EA] flex items-center justify-center">
          <LoginIllustration />
        </div>

      </div>

    </div>
  );
};

export default Loginmain;
