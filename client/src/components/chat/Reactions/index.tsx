"use client";

import { useState } from "react";
import ReactionButton from "./ReactionButton";
import Reactions from "./Reactions";

const index = ({ message, hovered }: { message: any; hovered: boolean }) => {
    const [reactions, setReactions] = useState(message?.reactions);

    return (
        <>
            <Reactions
                reactions={reactions}
                setReactions={setReactions}
                message={message}
            />

            <ReactionButton
                setReactions={setReactions}
                message={message}
                hovered={hovered}
            />
        </>
    );
};

export default index;
