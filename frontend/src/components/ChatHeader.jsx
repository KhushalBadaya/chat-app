import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  useEffect(()=>{
    const handleEscKey = (event) =>{
        if(event.key === "Escape") setSelectedUser(null)
    }
    window.addEventListener("keydown",handleEscKey)

    return()=>{
        window.removeEventListener("keydown",handleEscKey)
    }
  },[setSelectedUser])
  return (
    <div className="flex justify-between items-center bg-slate-800/50 border -b border-slate-700/50 max-h-[81px] px-6 flex-1 ">
      <div className="flex item-center space-x-3">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "./avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>
        <div>
        <h3 className="text-slate-200 font-medium">{selectedUser.fullName}</h3>
        <p className="text-slate-400 font-small">Online</p>
        </div>
      </div>
      <button onClick={()=>setSelectedUser(null)}>
        <XIcon className="W-5 H-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"></XIcon>
      </button>
    </div>
  );
}
export default ChatHeader;
