import useStore from "@/helpers/store";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PromptPanel from "../components/PromptPanel";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
// import Shader from '@/components/canvas/ShaderExample/ShaderExample'

// Prefer dynamic import for production builds
// But if you have issues and need to debug in local development
// comment these out and import above instead
// https://github.com/pmndrs/react-three-next/issues/49
const Shader = dynamic(
  () => import("@/components/canvas/ShaderExample/ShaderExample"),
  {
    ssr: false
  }
);

const URL = "http://localhost:3000";

const editorConfig = {
  theme: "vs",
  height: "80vh",
  defaultLanguage: "python",
  options: {
    minimap: {
      enabled: false
    },
    fontFamily: "JetBrains Mono",
    fontSize: 14,
    readOnly: false,
    smoothScrolling: true
  }
};
type PlaygroundProps = {
  problemData: {
    id: number;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    objectives: [string];
    examples: [
      {
        input: string;
        output: string;
        explanation?: string;
      }
    ];
    starterCode: string;
    timeLimit: number;
  };
};

// DOM elements here
const DOM = ({ problemData }: PlaygroundProps) => {
  const [language, setLanguage] = useState("python");

  const [minutesLeft, setMinutesLeft] = useState(problemData.timeLimit); // minutes
  const [code, setCode] = useState(problemData.starterCode);

  useEffect(() => {
    let timer = null;

    if (minutesLeft > 0) {
      timer = setInterval(() => {
        setMinutesLeft(minutesLeft - 1);
      }, 60000); // 60000ms / 1 min
    }

    return () => clearInterval(timer);
  }, [minutesLeft]);

  const displayTimeLeft = () => {
    if (minutesLeft >= 2) {
      return `${minutesLeft} minutes`;
    } else if (minutesLeft === 1) {
      return `1 minute... Hurry!`;
    } else {
      return "Times up!";
    }
  };

  const handleEditorChange = value => {
    setCode(value);
  };

  const handleSubmit = async () => {
    const body = {
      language: language,
      script: code
    };

    alert(`POST Body: ${JSON.stringify(body)}`);

    const res = await fetch(`${URL}/execute`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };

  return (
    <>
      <div className="flex flex-col w-full md:flex-row">
        <PromptPanel {...problemData} />

        <div className="w-full md:w-2/3 hidden md:block">
          <div className="w-full">
            <h2 className="text-2xl font-bold text-center pt-10">
              <span>Sebastian</span> vs. <span>Emily</span>
            </h2>
            <p className="text-center">{displayTimeLeft()}</p>
          </div>

          <Editor
            className="border-l-2"
            language={language}
            defaultValue={code}
            onChange={handleEditorChange}
            defaultLanguage={editorConfig.defaultLanguage}
            height={editorConfig.height}
            theme={editorConfig.theme}
            options={editorConfig.options}
          />

          <div className="flex justify-end w-full">
            <button
              onClick={handleSubmit}
              className="bg-pink-600 mt-3 mx-12 py-1 px-4 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Canvas/R3F components here
const R3F = () => {
  return <></>;
};

export default function playground(props) {
  return (
    <>
      <DOM {...props} />
      {/* <R3F /> */}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${URL}/problems/1`);
  const data = await res.json();
  console.log(data);

  return {
    props: {
      title: "Playground",
      problemData: data
    }
  };
}
