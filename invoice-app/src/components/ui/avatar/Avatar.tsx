import Button from "../button/button.tsx";
import Icon from "../icon/Icon.tsx";
import { HTMLAttributes, useEffect, useState } from "react";
import "./avatar.styles.css";
import Text from "../typography/text/Text.tsx";
import Dropdown from "../dropdown/Dropdown.tsx";
import { userInfo } from "../../../constants.ts";
import { useAppDispatch } from "../../../hooks/useRedux.ts";
import { logout } from "../../../features/auth/auth.slice.ts";

interface AvatarProps extends HTMLAttributes<HTMLButtonElement> {
  image: string;
  radius?:
    | "rounded"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-full";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const Avatar = ({
  image,
  radius = "rounded",
  size = "md",
  className,
}: AvatarProps) => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleToggleProfile = () => setShowProfile((prev) => !prev);

  useEffect(() => {
    const disablePopup = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".avatar__container")) {
        setShowProfile(false);
      }
    };
    document.addEventListener("click", disablePopup);
    return () => {
      document.removeEventListener("click", disablePopup);
    };
  }, []);

  return (
    <div className={`avatar__container`}>
      {showProfile && (
        <>
          <Dropdown className={`profile__dropdown`}>
            <div className={`profile__dropdown__user-info`}>
              <Icon
                icon={userInfo?.profileImg ?? ""}
                description={"profile pic"}
                radius={radius}
                size={"xl"}
              />
              <div className={`profile__dropdown__user-info__details`}>
                <Text bold>
                  {userInfo?.name ?? "anonymous"} ({userInfo?.role})
                </Text>
                <Text size={"sm"}>{userInfo?.position ?? "unknown"}</Text>
                <Text size={"sm"} className={`email`}>
                  {userInfo?.email ?? "unknown"}
                </Text>
              </div>
            </div>

            <Button variant={"secondary"} radius={"rounded-md"}>
              edit profile
            </Button>
            <Button
              variant={"danger"}
              radius={"rounded-md"}
              onClick={() => dispatch(logout())}
            >
              logout
            </Button>
          </Dropdown>
        </>
      )}
      <Button
        radius={radius}
        className={`avatar ${className ?? ""}`}
        onClick={handleToggleProfile}
      >
        <Icon
          icon={image}
          description={"profile pic"}
          radius={radius}
          size={size}
        />
      </Button>
    </div>
  );
};

export default Avatar;
