import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSekeleton";

function ContactList() {
  const { getAllContacts, isUserLoading, setSelectedUser, allContacts } = useChatStore();
  
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) return <UserLoadingSkeleton />;

  return (
    <div>
      <>
        {allContacts.map((contact) => (
          <div 
            key={contact._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors mb-2 " 
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3 ">
              <div className="avatar online">
                <div className="w-12 h-12 rounded-full overflow-hidden ">
                  <img
                    src={contact.profilePic || "avatar.png"}
                    alt={contact.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div> 
              <h4 className="text-slate-200 font-medium truncate">
                {contact.fullName}
              </h4>
            </div>
          </div>
        ))}
      </>
    </div>
  );
}

export default ContactList;