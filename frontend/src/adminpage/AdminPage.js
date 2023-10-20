import React, { useState } from "react";
import { Container, Button } from "reactstrap";
import EditUserDetails from "./EditUserDetails";
import Authorized from "../Authorized";
import AppNavbar from "../appnavbar/AppNavbar";
import EditCategoryDetails from "./EditCategoryDetails";

export default function AdminPage() {
    const [showUsers, setShowUsers] = useState(true);

    return (
        <Authorized requiredRoles={["ADMIN"]}>
            <div>
                <AppNavbar></AppNavbar>

                <Container>
                    <h1 className="mb-3 mt-3 align-content-center">Admin page</h1>
                    <Button onClick={() => setShowUsers(true)}>Manage user data</Button>{' '}
                    <Button onClick={() => setShowUsers(false)}>Manage categories</Button>
                    {showUsers ? <EditUserDetails /> : <EditCategoryDetails/>}
                </Container>
            </div>
        </Authorized>
    );
}