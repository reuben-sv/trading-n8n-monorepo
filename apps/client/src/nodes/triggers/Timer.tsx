import { Handle, Position } from "@xyflow/react";
import { type TimerNodeMetadata } from "common/types";

export function Timer({
	data,
	isConnectable,
}: {
	data: {
		metadata: TimerNodeMetadata;
	};
	isConnectable: boolean;
}) {
	const secondsDisplay = data.metadata.time;
	return (
		<div className="workflow-node workflow-node-trigger">
			<span className="workflow-node-label">Timer</span>
			<span className="workflow-node-value">
				Every {secondsDisplay} seconds
			</span>
			<Handle type="source" position={Position.Right}></Handle>
		</div>
	);
}
