import { Alert, AlertTitle } from "~/components/ui/alert";

export default async function Page() {

    return (
      <div className="flex flex-col items-center justify-center h-screen w-full text-center">
        <Alert>
            <AlertTitle>
                Navigate bitch
            </AlertTitle>
        </Alert>
      </div>
    )
}
