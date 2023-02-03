import { useState } from "react";
import { api } from "@/utils/api";
type User = {
  id?: string;
  name?: string | null;
  email?: string | null;
};
const ProfileForm = ({ data }: { data?: User | null }) => {
  const [userInfo, setUserInfo] = useState<User | null>(data || {});
  const { mutate: updateUser } = api.user.updateUser.useMutation({
    onSuccess(data) {
      setUserInfo(data);
    },
    onError(e) {
      console.error(e);
    },
  });
  return (
    <form className="form login__card-body" role="form">
      <div className="form__input-group">
        <label htmlFor="name" className="form__label">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          className="form__input"
          value={userInfo?.name ? userInfo?.name : ""}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
      </div>
      <div className="form__input-group">
        <label htmlFor="email" className="form__label">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="form__input"
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          value={userInfo?.email ? userInfo?.email : ""}
        />
      </div>
      <button
        type="button"
        className="form__button"
        onClick={() => updateUser({ ...userInfo })}>
        Update Info
      </button>
    </form>
  );
};

export default ProfileForm;
