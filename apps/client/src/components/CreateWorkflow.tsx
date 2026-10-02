import { useState, useCallback } from "react";
import TriggerSheet from "./TriggerSheet";
import ActionSheet from "./ActionSheet";

import {
	ReactFlow,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Pricetrigger } from "@/nodes/triggers/PriceTrigger";
import { type PriceTriggerMetadata } from "common/types";

import { Timer } from "@/nodes/triggers/Timer";
import { type TimerNodeMetadata } from "common/types";

import { Lighter } from "@/nodes/actions/Lighter";
import { type TradingMetadata } from "common/types";

import { Backpack } from "@/nodes/actions/Backpack";
import { Hyperliquid } from "@/nodes/actions/Hyperliquid";

const nodeTypes = {
	"price-trigger": Pricetrigger,
	timer: Timer,
	lighter: Lighter,
	backpack: Backpack,
	hyperliquid: Hyperliquid,
};

export type NodeKind =
	"price-trigger" | "timer" | "backpack" | "lighter" | "hyperliquid";

// shape of the node
interface NodeType {
	type: NodeKind;
	data: {
		kind: "action" | "trigger";
		metadata: NodeMetadata;
	};
	id: string;
	position: { x: number; y: number };
}

interface Edge {
	id: string;
	source: string;
	target: string;
}

interface selectActionShape {
	position: { x: number; y: number };
	startingNodeId: string;
}

export type NodeMetadata =
	TradingMetadata | PriceTriggerMetadata | TimerNodeMetadata; //replace with actual metadata type

export function CreateWorkflow() {
	const [nodes, setNodes] = useState<NodeType[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [selectAction, setSelectedAction] =
		useState<selectActionShape | null>();

	const onNodesChange = useCallback(
		(changes: any) =>
			setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[],
	);
	const onEdgesChange = useCallback(
		(changes: any) =>
			setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[],
	);
	const onConnect = useCallback(
		(params: any) =>
			setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
		[],
	);

	const onConnectEnd = useCallback((params: any, connectionInfo: any) => {
		if (!connectionInfo.isValid) {
			const POSITION_OFFSET = 200;
			setSelectedAction({
				startingNodeId: connectionInfo.fromNode.id,
				position: {
					x: connectionInfo.from.x + POSITION_OFFSET,
					y: connectionInfo.from.y,
				},
			});
			console.log("connection info - ", connectionInfo);
			//console.log("onConnectEnd FROM", connectionInfo.fromNode.id);
			//console.log("onConnectEnd TO", connectionInfo.toNode.id);
		}
	}, []);
	const nodeid = crypto.randomUUID();
	return (
		<>
			<div
				className="workflow-canvas"
				style={{ width: "100vw", height: "100vh" }}>
				{!nodes.length && (
					<TriggerSheet
						onSelect={(type, metadata) => {
							setNodes([
								...nodes,
								{
									id: nodeid,
									type,
									data: {
										kind: "trigger",
										metadata,
									},
									position: { x: 0, y: 0 },
								},
							]);
							console.log(nodeid);
						}}
					/>
				)}
				{selectAction && (
					<ActionSheet
						onSelect={(type, metadata) => {
							const nodeid = crypto.randomUUID();
							console.log("select action - ", selectAction);
							setNodes([
								...nodes,
								{
									id: nodeid,
									type,
									data: {
										kind: "action",
										metadata,
									},
									position: selectAction.position,
								},
							]);
							setEdges([
								...edges,
								{
									id: `${selectAction.startingNodeId}-${nodeid}`,
									source: selectAction.startingNodeId,
									target: nodeid,
								},
							]);
							setSelectedAction(null);
						}}
					/>
				)}
				<span className="workflow-status">Connections: {edges.length}</span>
				<ReactFlow
					nodeTypes={nodeTypes}
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onConnectEnd={onConnectEnd}
					fitView
				/>
			</div>
		</>
	);
}
export default CreateWorkflow;
