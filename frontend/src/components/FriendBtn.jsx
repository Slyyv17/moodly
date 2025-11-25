import { useEffect, useState } from "react";
import api from "../libs/apis/api";
import { SendRequest, CancelRequest, CheckRequest } from "../services/friendService";
import { toast } from "sonner";

export default function FriendButton({ targetId, isIncoming = false, onAction }) {
    const [hasRequested, setHasRequested] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isIncoming) {
            const check = async () => {
                try {
                    const data = await CheckRequest(targetId);
                    setHasRequested(data.requested);
                } catch (err) {
                    console.error(err);
                }
            };
            check();
        }
    }, [targetId, isIncoming]);

    const handleSendRequest = async () => {
        setLoading(true);
        try {
            await SendRequest(targetId);
            toast.success("Friend request sent!");
            setHasRequested(true);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelRequest = async () => {
        setLoading(true);
        try {
            await CancelRequest(targetId);
            toast.success("Request canceled.");
            setHasRequested(false);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await api.post(`/user/accept/${targetId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Friend request accepted!");
            onAction && onAction("accepted");
        } catch (err) {
            toast.error(err.message || "Failed to accept request");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await api.post(`/user/reject/${targetId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Friend request rejected!");
            onAction && onAction("rejected");
        } catch (err) {
            toast.error(err.message || "Failed to reject request");
        } finally {
            setLoading(false);
        }
    };

    if (isIncoming) {
        return (
            <div className="flex gap-2">
                <button
                    onClick={handleAccept}
                    disabled={loading}
                    className="bg-green-500 text-white font-semibold p-2 rounded cursor-pointer"
                >
                    Accept
                </button>
                <button
                    onClick={handleReject}
                    disabled={loading}
                    className="bg-red-500 text-white font-semibold p-2 rounded cursor-pointer"
                >
                    Reject
                </button>
            </div>
        );
    }

    return hasRequested ? (
        <button
            onClick={handleCancelRequest}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
        >
            Cancel Request
        </button>
    ) : (
        <button
            onClick={handleSendRequest}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
            Send Request
        </button>
    );
}