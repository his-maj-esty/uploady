import { useUser } from "@clerk/nextjs";

export function getUser() {

    const { user } = useUser();
    const firstName = user?.firstName;
    const lastName = user?.lastName;
    const email = user?.emailAddresses[0].emailAddress;
      console.log(firstName, lastName, email, "from get user");

    return { firstName, lastName, email };
}
