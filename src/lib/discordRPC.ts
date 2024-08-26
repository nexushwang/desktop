import { Client } from "discord-rpc";
import { getConfig } from "./config";

export var rpc: Client;

export async function connectRPC() {
    if (!getConfig().discordRPC) return;

    try {
        rpc = new Client({ transport: "ipc" });

        rpc.on("ready", () =>
            rpc.setActivity({
                state: "Nexus Cloud",
                details: "Chatting with others",
                largeImageKey: "qr",
                largeImageText: "Communication is critical – use Revolt.",
                buttons: [
                    {
                        label: "Join Revolt",
                        url: "https://staff.cloudserver.nexus",
                    },
                    {
                        label: "Website",
                        url: "https://staff.cloudserver.nexus",
                    },
                ],
            }),
        );

        // @ts-ignore
        rpc.on("disconnected", reconnect);

        rpc.login({ clientId: "872068124005007420" });
    } catch (err) {
        reconnect();
    }
}

const reconnect = () => setTimeout(() => connectRPC(), 1e4);

export async function dropRPC() {
    rpc?.destroy();
}
