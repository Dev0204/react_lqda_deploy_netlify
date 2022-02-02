import React from 'react';
import LevelOne from "components/RewardComponents/LevelOne";
import LevelTwo from "components/RewardComponents/LevelTwo";
import LevelThree from "components/RewardComponents/LevelThree";
import { useNativeBalance } from "hooks/useNativeBalance";
import { n4 } from "helpers/formatters";

const Rewards = (props) => {
    const { balance } = useNativeBalance(props);
    if (n4.format(balance.formatted) <= 100) {
        return (<LevelOne />)
    } else if (n4.format(balance.formatted) >= 101 && n4.format(balance.formatted) <= 300) {
        return (<LevelTwo />)
    } else {
        return (<LevelThree />)
    }
}

export default Rewards;
