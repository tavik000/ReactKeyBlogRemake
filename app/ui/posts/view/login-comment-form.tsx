'use client';
import { Button } from '@/app/ui/button';
import { useLoginOpenFromPostContext } from '@/app/components/context/login-open-from-post-provider';
import { useSessionContext } from '@/app/components/context/session-provider';



export default function LoginCommentForm() {

    const { session } = useSessionContext();
    const { setIsLoginOpenFromPost } = useLoginOpenFromPostContext();

    return (
        <div>
            {session && session?.user ? (
                <></>
            ) : (
                <>
                    <div className="flex-col rounded-lg mt-4 p-6 text-center bg-gray-200">
                        <p className="flex justify-center text-lg font-semibold text-black">Let&apos;s comment your feeling</p>
                        <div className="flex justify-center mt-4 w-full">
                            <Button className=" flex justify-center bg-orange-500 hover:bg-orange-600 focus-visible:outline-orange-500 active:bg-orange-600"
                                onClick={() => {
                                    setIsLoginOpenFromPost(true);
                                }}
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}