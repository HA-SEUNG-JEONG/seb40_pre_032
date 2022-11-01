import React from 'react';
import { IoFilterSharp } from 'react-icons/io5';
import ViewCountBtn from './ViewCountBtn';
import ScoreBtn from './ScoreBtn';
import UnansweredBtn from './UnansweredBtn';

function ButtonGroup() {
	return (
		<div className="w-[363px] flex">
			<div className="flex  h-[34px] items-center mr-4">
				<ViewCountBtn />
				<ScoreBtn />
				<UnansweredBtn />
			</div>
			<div className="border-border-blue rounded-[5px] border-solid flex border h-[34px] hover:bg-[#b3d3e9] text-[#37739c] bg-[#e0ecf3] text-[13px]">
				<button
					type="button"
					className="w-[68px] flex items-center justify-center decoration-[#e0ecf3] "
				>
					<IoFilterSharp className="decoration-[#e0ecf3]" />
					&nbsp;Filter
				</button>
			</div>
		</div>
	);
}

export default ButtonGroup;
