import Container from "@/components/Container";
import Navbar from "@/components/Navbar/Navbar";
import { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Router from "next/router";
import { useState } from "react";
import { AiFillLinkedin, AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";

const Dom = ({}) => {
  const { status } = useSession();

  if (status === "authenticated") {
    Router.push("/menu");
  }

  const size = 35;

  const [loginMethods] = useState([
    {
      name: "Google",
      icon: <AiFillGoogleCircle size={size}/>,
      providerId: "google"
    },
    {
      name: "Linkedin",
      icon: <AiFillLinkedin size={size}/>,
      providerId: "linkedin"
    },
    {
      name: "GitHub",
      icon: <AiFillGithub size={size} />,
      providerId: "github"
    }
  ]);

  return (
    <div className="w-screen">
      <Navbar hideElements />

      <div className="flex flex-col items-center justify-center ">
        <div>
          <Image
            src="/static/auth/graphic.svg"
            alt=""
            width={250}
            height={200}
          />
        </div>

        <h1 className="mt-6 text-5xl capitalize font-gilroy-bold">
          Sign in
        </h1>

        <div className="flex flex-col items-center justify-center gap-3 mt-10">
          {loginMethods.map(({ name, icon, providerId }, index) => (
            <Container key={index} onHover>
              <button
                className="flex items-center justify-center h-16 cursor-pointer w-[768px]"
                onClick={() => signIn(providerId, { callbackUrl: "/menu" })}
              >
                {icon}
                {/* <Image src={icon} alt={name} width={30} height={30} /> */}
              </button>
            </Container>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Auth(props) {
  return (
    <>
      <Dom {...props} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      title: "Login - Register"
    }
  };
};
