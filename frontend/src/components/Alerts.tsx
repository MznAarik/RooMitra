import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { AlertColor } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
    message: string;
    severity?: AlertColor;
    autoHideMs?: number;
}
export default function OutlinedAlerts({
    message,
    severity = "info",
    autoHideMs = 4000,
}: Props) {
    const [open, setOpen] = useState(Boolean(message));

    useEffect(() => {
        setOpen(Boolean(message));
    }, [message]);

    if (!message) return null;

    return (
        <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={autoHideMs}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert
                severity={severity}
                action={
                    <IconButton
                        aria-label="close"
                        size="small"
                        color="inherit"
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
                sx={{ alignItems: "center", borderRadius: 3 }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
