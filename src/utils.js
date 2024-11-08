import { faAngleDown, faGear, faHashtag, faMagnifyingGlass, faPhone, faPowerOff, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { auth } from "./firebase";

export const icons = {
    faPhone,
    faHashtag,
    faXmark,
    faMagnifyingGlass,
    faAngleDown
};

export const menuItems = [
    {
        icon: faUser,
        content: "Profile",
        onClick: () => console.log("사용자 프로필")
    },
    {
        icon: faGear,
        content: "Setting",
        onClick: () => console.log("설정")
    },
    {
        icon: faPowerOff,
        content: "Logout",
        onClick: () => {
            auth.signOut();
            window.location.reload();
        }
    }
];

export const toLocalePhoneNumber = (input) => {
    const cleanText = input.replace(/-/g, "");
    const MAX_LENGTH = 11;
    const FIRST_HYPHEN_INDEX = 3;
    const SECOND_HYPHEN_INDEX = 7;

    let localePhoneNumber = cleanText.slice(0, MAX_LENGTH);

    if (localePhoneNumber.length > SECOND_HYPHEN_INDEX) {
        localePhoneNumber = localePhoneNumber.slice(0, SECOND_HYPHEN_INDEX) +
        "-" +
        localePhoneNumber.slice(SECOND_HYPHEN_INDEX);
    }
    if (localePhoneNumber.length > FIRST_HYPHEN_INDEX) {
        localePhoneNumber = localePhoneNumber.slice(0, FIRST_HYPHEN_INDEX) +
        "-" +
        localePhoneNumber.slice(FIRST_HYPHEN_INDEX);
    }

    return localePhoneNumber;
};

export const toIntlPhoneNumber = (input) => {
    let intlPhoneNumber = input.replace(/-/g, "");
    if (intlPhoneNumber.length > 0 && intlPhoneNumber[0] === "0") {
        intlPhoneNumber = "+82" + intlPhoneNumber.substring(1);
    } else {
        intlPhoneNumber = "+82" + intlPhoneNumber;
    }

    return intlPhoneNumber;
}