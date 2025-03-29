import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Error = ({ message = "Something went wrong!" }) => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="p-6 shadow-lg rounded-2xl text-center max-w-md">
                <CardHeader>
                    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
                    <CardTitle className="text-2xl font-bold text-gray-800 mt-2">
                        Oops! An Error Occurred
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">{message}</p>
                    <Button
                        onClick={() => navigate("/")}
                        className="mt-4 text-white px-4 py-2 rounded-lg"
                    >
                        Go Home
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Error;
