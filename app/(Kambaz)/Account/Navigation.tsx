import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      <Link href="Signin" id="wd-signin-link" className="list-group-item border-0 border-start border-dark border-3">
        Signin
      </Link>
      <Link href="Signup" id="wd-signup-link" className="list-group-item text-danger border-0">
        Signup
      </Link>
      <Link href="Profile" id="wd-profile-link" className="list-group-item text-danger border-0">
        Profile
      </Link>
    </div>
  );
}

