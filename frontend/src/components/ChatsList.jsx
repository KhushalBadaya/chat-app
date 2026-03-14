import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSekeleton";
import NoChatFound from "./NoChatsFound";

function ChatsList() {
  const { getMyChatsPartners, chats, isUserLoading, setSelectedUser } =useChatStore();

  useEffect(() => {
    getMyChatsPartners();
  }, [getMyChatsPartners]);

  if (isUserLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatFound />;
  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transiations-colors "
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={"avataar online"}>
              <div className="size 12 rounded-full">
                <img
                  src={chat.profilePic || "avatar.png"}
                  alt={chat.fullName}
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {chats.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatsList;
