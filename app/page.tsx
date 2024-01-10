import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="p-6 md:p-8 bg-slate-700">
        <div className="flex flex-col md:flex-row space-y-16 md:space-y-0 md:space-x-10 ">
          <div className="flex flex-col space-y-10 max-w-xl text-justify">
            <div className="flex flex-col space-y-5 ">
              <div className="text-3xl md:text-4xl font-bold">
                Welcome to Uploady!
              </div>
              <div className="space-y-3">
                <div className="text-3xl md:text-4xl font-bold">
                  Storing everything for you and your buisness needs. All in one
                  place.
                </div>
                <div>
                  Enhance your personal storage with Uploady, offering simple
                  and efficient way to upload, organise and access files from
                  anywhere. Securly store important media and documents and
                  share them in one centralized solution.
                </div>
              </div>
            </div>
            <Link
              href={"/dashboard"}
              className="flex bg-blue-500 w-fit text-white p-3"
            >
              <div>Try for free</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </Link>
          </div>
          <div className="rounded-xl overflow-clip w-fit mx-auto my-5">
            <Image
              src="/files.png"
              width={500}
              height={500}
              alt="files"
            ></Image>
          </div>
        </div>
      </div>
      <div>
        Disclaimer
      </div>
    </>
  );
}
