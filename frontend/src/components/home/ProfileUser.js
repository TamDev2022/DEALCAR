import { useContext, useEffect, useState } from "react";
import ProfileUserApi from "../../Api/ProfileUserApi";
import defaultAvatar from "../../Assets/Images/default-avatar.png";

function ProfileUser() {
  const { dispatch } = useContext(AuthContext);

  const [myProfile, setMyProfile] = useState(null);
  // const [profileOld, setProfileOld] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let res = await ProfileUserApi.getInforUser();
        if (res.success) {
          // console.log(res);
          setMyProfile(res.data);
          // setProfileOld(res.data);
        } else {
          alert(res.message);
        }
      } catch (error) {}
    })();
    return () => {
      setMyProfile(null);
    };
  }, []);

  // const onChangeUserName = (e) => {
  //   e.preventDefault();
  //   setMyProfile({ ...myProfile, username: e.target.value });
  // };
  const onChangeName = (e) => {
    e.preventDefault();
    setMyProfile({ ...myProfile, name: e.target.value });
  };
  const onChangeEmail = (e) => {
    e.preventDefault();
    setMyProfile({ ...myProfile, email: e.target.value });
  };
  const onChangePhoneNumber = (e) => {
    e.preventDefault();
    setMyProfile({ ...myProfile, phoneNumber: e.target.value });
  };
  const onChangeAvatar = (e) => {
    e.preventDefault();
    // console.log(e.target.files)
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      const avatarFile = e.target.files[0];
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setMyProfile({ ...myProfile, avatar: reader.result });

          const formData = new FormData();
          formData.append("Username", "");
          formData.append("Avatar", avatarFile);

          ProfileUserApi.changeAvatar(formData)
            .then((res) => {
              if (res.success) {
                ProfileUserApi.getInforUser().then((res1) => {
                  if (res1.success) {
                    dispatch({
                      type: "UPDATE",
                      payload: { user: res1.data },
                    });
                  }
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let data = {
      email: myProfile.email,
      phoneNumber: myProfile.phoneNumber,
      name: myProfile.name,
    };
    // console.log(data);
    (async () => {
      try {
        let res = await ProfileUserApi.updateInfo(data);
        if (res.success) {
          alert("Thành công");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <>
      <div className="profile-container">
        {myProfile != null ? (
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3">
                <div className="box-avatar">
                  <img
                    className="rounded-circle border"
                    src={myProfile.avatar ? myProfile.avatar : defaultAvatar}
                    alt=""
                  />
                  <div className="box-filter-avatar">
                    <label htmlFor="choose-avatar-file" className="btn ">
                      <i className="bi bi-camera" />
                    </label>
                  </div>
                </div>

                <input
                  id="choose-avatar-file"
                  className="choose-file mt-3"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onChangeAvatar}
                  hidden
                />
                <span className="username-avatar font-weight-bold">
                  {myProfile.username}
                </span>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>

                <div className="row mt-3">
                  <div className="col-md-12 mb-3">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter name"
                      value={myProfile.name}
                      onChange={onChangeName}
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="labels">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter email"
                      value={myProfile.email}
                      onChange={onChangeEmail}
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="labels">Phone number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter phone number"
                      value={myProfile.phoneNumber}
                      onChange={onChangePhoneNumber}
                    />
                  </div>
                  <div className="mt-5">
                    <button className="btn btn-primary" onClick={handleSave}>
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default ProfileUser;
