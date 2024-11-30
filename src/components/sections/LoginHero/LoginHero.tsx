import AuthCarousel from '../AuthCarousel/AuthCarousel';
import LoginForm from '../LoginForm/LoginForm';

function LoginHero() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 container mx-auto ">
      <div className="w-full  max-w-5xl  grid md:grid-cols-2 rounded-lg ">
        <div className="w-full p-8 mt-5">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-medium">Sign in</h2>
            <p className="text-sm font-medium text-creator-text-300">
              Welcome back, please enter your details
            </p>
          </div>
          <LoginForm />
        </div>

        <div className=" flex items-center justify-center">
          <div className="hidden md:block sm:w-96 md:w-[425px] lg:w-[350px] w-full  relative mx-auto ">
            <AuthCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginHero;
