"user client";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { signInAction, signOutAction } from "@/app/lib/actions";
import { AuthError } from "next-auth";
import { Avatar } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLoginOpenFromPostContext } from "@/app/components/context/login-open-from-post-provider";
import { useLocaleContext } from "@/app/components/context/locale-provider";
import { useSessionContext } from "@/app/components/context/session-provider";

export function UserButton() {
  const { session, setSession } = useSessionContext();
  const { dict } = useLocaleContext();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSignInLoadingGoogle, setIsSignInLoadingGoogle] = useState<boolean>(false);
  const [isSignInLoadingTwitter, setIsSignInLoadingTwitter] = useState<boolean>(false);
  const pathname = usePathname();
  const { isLoginOpenFromPost, setIsLoginOpenFromPost } = useLoginOpenFromPostContext();

  if (session?.user) {
    console.log("user image: ", session.user.image);
  }

  // Sync login context with modal
  useEffect(() => {
    if (isLoginOpenFromPost) {
      onOpen();
    }
  }, [isLoginOpenFromPost, onOpen]);

  useEffect(() => {
    setIsLoginOpenFromPost(isOpen);
  }, [isOpen, setIsLoginOpenFromPost]);

  return (
    <>
      <Dropdown className="flex-none">
        <DropdownTrigger>
          <button className="my-2 mr-4 flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors focus:outline-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
            {session?.user && session.user?.image ? (
              <Avatar src={session.user.image} />
            ) : (
              <UserCircleIcon className="h-8 w-8 text-gray-500 hover:text-orange-500" />
            )}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          className="max-h-96 overflow-y-auto rounded-lg bg-white"
          aria-label="Static Actions"
          onAction={(key) => {
            const actionKey = key.toString();
            if (actionKey === "SignIn") {
              onOpen();
            }
            if (actionKey === "SignOut") {
              setSession(null);
              signOutAction(pathname);
            }
          }}
        >
          {session?.user ? (
            <DropdownItem className="hover:bg-gray-100" key="SignOut">
              {dict.header.signOut}
            </DropdownItem>
          ) : (
            <DropdownItem className="hover:bg-gray-100" key="SignIn">
              {dict.header.signIn}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <Modal
        isOpen={isOpen || isLoginOpenFromPost}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="rounded-lg bg-white xs:top-80 md:top-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="mt-6 flex flex-col gap-1 text-center text-xl">
                {dict.header.signInToKeyBlog}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-between px-1 py-2">
                  <Button
                    disabled={isSignInLoadingGoogle || isSignInLoadingTwitter}
                    color="primary"
                    variant="flat"
                    className={
                      isSignInLoadingGoogle
                        ? "mb-4 flex w-full rounded-lg bg-gray-300 outline-gray-300"
                        : "mb-4 flex w-full rounded-lg bg-white outline-gray-300 hover:outline-orange-200"
                    }
                    onClick={() => {
                      try {
                        setIsSignInLoadingGoogle(true);
                        signInAction("google", pathname);
                        onClose();
                      } catch (error) {
                        setIsSignInLoadingGoogle(false);
                        if (error instanceof AuthError) {
                          throw new Error("AuthError: " + error.message);
                        }
                      } finally {
                        setIsSignInLoadingGoogle(false);
                      }
                    }}
                  >
                    {isSignInLoadingGoogle ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <></>
                    )}

                    <span className="">
                      <svg viewBox="0 0 533.5 544.3" height="18" width="18">
                        <title>google-colored</title>
                        <path
                          d="M533.5,278.4a320.07,320.07,0,0,0-4.7-55.3H272.1V327.9h147a126,126,0,0,1-54.4,82.7v68h87.7C503.9,431.2,533.5,361.2,533.5,278.4Z"
                          fill="#4285f4"
                        ></path>
                        <path
                          d="M272.1,544.3c73.4,0,135.3-24.1,180.4-65.7l-87.7-68c-24.4,16.6-55.9,26-92.6,26-71,0-131.2-47.9-152.8-112.3H28.9v70.1A272.19,272.19,0,0,0,272.1,544.3Z"
                          fill="#34a853"
                        ></path>
                        <path
                          d="M119.3,324.3a163,163,0,0,1,0-104.2V150H28.9a272.38,272.38,0,0,0,0,244.4Z"
                          fill="#fbbc04"
                        ></path>
                        <path
                          d="M272.1,107.7a147.89,147.89,0,0,1,104.4,40.8h0l77.7-77.7A261.56,261.56,0,0,0,272.1,0,272.1,272.1,0,0,0,28.9,150l90.4,70.1C140.8,155.6,201.1,107.7,272.1,107.7Z"
                          fill="#ea4335"
                        ></path>
                      </svg>
                    </span>
                    <p className="font-semibold">{dict.header.signInWithGoogle}</p>
                  </Button>

                  <Button
                    disabled={isSignInLoadingGoogle || isSignInLoadingTwitter}
                    color="primary"
                    variant="flat"
                    className={
                      isSignInLoadingTwitter
                        ? "mb-4 flex w-full rounded-lg bg-gray-300 outline-gray-300"
                        : "mb-4 flex w-full rounded-lg bg-white outline-gray-300 hover:outline-orange-200"
                    }
                    onClick={() => {
                      try {
                        setIsSignInLoadingTwitter(true);
                        signInAction("twitter", pathname);
                        onClose();
                      } catch (error) {
                        setIsSignInLoadingTwitter(false);
                        if (error instanceof AuthError) {
                          throw new Error("AuthError: " + error.message);
                        }
                      } finally {
                        setIsSignInLoadingTwitter(false);
                      }
                    }}
                  >
                    {isSignInLoadingTwitter ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <></>
                    )}
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-twitter-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                      </svg>
                    </span>
                    <p className="font-semibold">{dict.header.signInWithTwitter}</p>
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    onClose();
                  }}
                >
                  {dict.header.close}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {isOpen || isLoginOpenFromPost ? (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-20 bg-black/40"></div>
      ) : (
        <></>
      )}
    </>
  );
}
