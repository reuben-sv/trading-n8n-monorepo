import { Handle, Position } from "@xyflow/react";
import { type PriceTriggerMetadata } from "common/types";

export function Pricetrigger({
	data,
	isConnectable,
}: {
	data: {
		metadata: PriceTriggerMetadata;
	};
	isConnectable: boolean;
}) {
	return (
		<div className="workflow-node workflow-node-trigger">
			<span className="workflow-node-label">Price trigger</span>
			<div className="workflow-node-value">{data.metadata.asset}</div>
			<div className="workflow-node-detail">Target {data.metadata.price}</div>
			<Handle type="source" position={Position.Right}></Handle>
		</div>
	);
}
