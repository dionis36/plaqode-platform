"use client";

import React, { useMemo } from 'react';
import { Stage, Layer, Rect, Circle, Text, Path, RegularPolygon, Star, Arrow, Line, Image as KonvaImage, Group } from 'react-konva';
import useImage from 'use-image';
import { CardTemplate, KonvaNodeDefinition } from '@/types/template';
import { getIcon } from '@/lib/iconLoader';

// Inner component for handling image loading
const URLImage = ({ src, ...props }: any) => {
    const [image] = useImage(src || '', 'anonymous');
    return <KonvaImage image={image} {...props} />;
};

// Component for rendering Icon elements with proper SVG generation
const IconPreview = ({ layer }: { layer: KonvaNodeDefinition }) => {
    const props = layer.props as any;
    const { x, y, width, height, rotation, opacity, fill, stroke, strokeWidth, iconName } = props;

    // Get icon data from Iconify
    const iconData = useMemo(() => getIcon(iconName) || getIcon('lucide:help-circle'), [iconName]);

    // Generate SVG URL with proper fill and stroke
    const svgUrl = useMemo(() => {
        if (!iconData) return '';

        const svgString = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${iconData.width}" height="${iconData.height}" viewBox="0 0 ${iconData.width} ${iconData.height}" style="color: ${stroke !== 'transparent' ? stroke : fill}">
                <g fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}">
                    ${iconData.body}
                </g>
            </svg>
        `.trim();

        return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
    }, [iconData, fill, stroke, strokeWidth]);

    const [image] = useImage(svgUrl);

    return (
        <Group
            x={x}
            y={y}
            rotation={rotation}
            opacity={opacity}
            listening={false}
        >
            {image && (
                <KonvaImage
                    image={image}
                    width={width}
                    height={height}
                    listening={false}
                    perfectDrawEnabled={false}
                />
            )}
        </Group>
    );
};

interface KonvaPreviewStageProps {
    template: CardTemplate;
    width: number;
    height: number;
}

export default function KonvaPreviewStage({ template, width, height }: KonvaPreviewStageProps) {
    // Calculate scale to fit template in preview container
    const scale = useMemo(() => {
        const scaleX = width / template.width;
        const scaleY = height / template.height;
        return Math.min(scaleX, scaleY);
    }, [template.width, template.height, width, height]);

    // Render background
    const renderBackground = () => {
        const bg = template.background;
        if (!bg) {
            return <Rect width={template.width} height={template.height} fill="#F3F4F6" listening={false} />;
        }

        if (bg.type === 'solid') {
            return <Rect width={template.width} height={template.height} fill={bg.color1} listening={false} />;
        }

        if (bg.type === 'gradient') {
            const stops = bg.gradientStops
                ? bg.gradientStops.flatMap(s => [s.offset, s.color])
                : [0, bg.color1, 1, bg.color2 || '#ffffff'];

            let gradientProps: any = {};

            if (bg.gradientType === 'radial') {
                gradientProps = {
                    fillRadialGradientStartPoint: { x: template.width / 2, y: template.height / 2 },
                    fillRadialGradientStartRadius: 0,
                    fillRadialGradientEndPoint: { x: template.width / 2, y: template.height / 2 },
                    fillRadialGradientEndRadius: Math.max(template.width, template.height) / 1.5,
                    fillRadialGradientColorStops: stops,
                };
            } else {
                const angleRad = (bg.rotation || 0) * (Math.PI / 180);
                const length = Math.sqrt(template.width * template.width + template.height * template.height) / 2;
                const cx = template.width / 2;
                const cy = template.height / 2;

                gradientProps = {
                    fillLinearGradientStartPoint: {
                        x: cx - Math.cos(angleRad) * length,
                        y: cy - Math.sin(angleRad) * length
                    },
                    fillLinearGradientEndPoint: {
                        x: cx + Math.cos(angleRad) * length,
                        y: cy + Math.sin(angleRad) * length
                    },
                    fillLinearGradientColorStops: stops,
                };
            }

            return (
                <Rect
                    width={template.width}
                    height={template.height}
                    {...gradientProps}
                    listening={false}
                />
            );
        }

        if (bg.type === 'pattern') {
            return (
                <>
                    <Rect width={template.width} height={template.height} fill={bg.color1} listening={false} />
                    {bg.patternColor && (
                        <Rect
                            width={template.width}
                            height={template.height}
                            fill={bg.patternColor}
                            opacity={0.1}
                            listening={false}
                        />
                    )}
                </>
            );
        }

        return <Rect width={template.width} height={template.height} fill={bg.color1 || "#F3F4F6"} listening={false} />;
    };

    // Render individual layer
    const renderLayer = (layer: KonvaNodeDefinition, index: number) => {
        const baseProps = {
            id: layer.props.id,
            x: layer.props.x,
            y: layer.props.y,
            width: layer.props.width,
            height: layer.props.height,
            rotation: layer.props.rotation,
            opacity: layer.props.opacity,
            listening: false,
            perfectDrawEnabled: false,
        };

        switch (layer.type) {
            case 'Text':
                return (
                    <Text
                        key={layer.id || index}
                        {...baseProps}
                        text={(layer.props as any).text || ''}
                        fontSize={(layer.props as any).fontSize || 16}
                        fontFamily={(layer.props as any).fontFamily || 'Arial'}
                        fill={layer.props.fill || '#000000'}
                        align={(layer.props as any).align || 'left'}
                    />
                );

            case 'Rect':
                return (
                    <Rect
                        key={layer.id || index}
                        {...baseProps}
                        fill={layer.props.fill}
                        stroke={(layer.props as any).stroke}
                        strokeWidth={(layer.props as any).strokeWidth}
                        cornerRadius={(layer.props as any).cornerRadius}
                    />
                );

            case 'Circle':
                return (
                    <Circle
                        key={layer.id || index}
                        x={layer.props.x}
                        y={layer.props.y}
                        radius={(layer.props as any).radius || 50}
                        fill={layer.props.fill}
                        stroke={(layer.props as any).stroke}
                        strokeWidth={(layer.props as any).strokeWidth}
                        rotation={layer.props.rotation}
                        opacity={layer.props.opacity}
                        listening={false}
                        perfectDrawEnabled={false}
                    />
                );

            case 'RegularPolygon':
                return (
                    <RegularPolygon
                        key={layer.id || index}
                        x={layer.props.x}
                        y={layer.props.y}
                        sides={(layer.props as any).sides || 6}
                        radius={(layer.props as any).radius || 50}
                        fill={layer.props.fill}
                        stroke={(layer.props as any).stroke}
                        strokeWidth={(layer.props as any).strokeWidth}
                        rotation={layer.props.rotation}
                        opacity={layer.props.opacity}
                        listening={false}
                        perfectDrawEnabled={false}
                    />
                );

            case 'Star':
                return (
                    <Star
                        key={layer.id || index}
                        x={layer.props.x}
                        y={layer.props.y}
                        numPoints={(layer.props as any).numPoints || 5}
                        innerRadius={(layer.props as any).innerRadius || 20}
                        outerRadius={(layer.props as any).outerRadius || 40}
                        fill={layer.props.fill}
                        stroke={(layer.props as any).stroke}
                        strokeWidth={(layer.props as any).strokeWidth}
                        rotation={layer.props.rotation}
                        opacity={layer.props.opacity}
                        listening={false}
                        perfectDrawEnabled={false}
                    />
                );

            case 'Arrow':
                return (
                    <Arrow
                        key={layer.id || index}
                        points={(layer.props as any).points || [0, 0, 100, 100]}
                        pointerLength={(layer.props as any).pointerLength || 10}
                        pointerWidth={(layer.props as any).pointerWidth || 10}
                        fill={layer.props.fill}
                        stroke={(layer.props as any).stroke}
                        strokeWidth={(layer.props as any).strokeWidth || 2}
                        opacity={layer.props.opacity}
                        listening={false}
                        perfectDrawEnabled={false}
                    />
                );

            case 'Line':
                return (
                    <Line
                        key={layer.id || index}
                        points={(layer.props as any).points || [0, 0, 100, 100]}
                        stroke={(layer.props as any).stroke || '#000000'}
                        strokeWidth={(layer.props as any).strokeWidth || 2}
                        opacity={layer.props.opacity}
                        listening={false}
                        perfectDrawEnabled={false}
                    />
                );

            case 'Icon':
                return <IconPreview key={layer.id || index} layer={layer} />;

            case 'Path':
                const pathProps = layer.props as any;
                if (pathProps.paths && Array.isArray(pathProps.paths)) {
                    return (
                        <React.Fragment key={layer.id || index}>
                            {pathProps.paths.map((pathData: any, pathIndex: number) => (
                                <Path
                                    key={`${layer.id || index}_${pathIndex}`}
                                    x={layer.props.x}
                                    y={layer.props.y}
                                    data={pathData.d || ''}
                                    fill={layer.props.fill}
                                    stroke={pathProps.stroke}
                                    strokeWidth={pathProps.strokeWidth}
                                    scaleX={pathProps.scaleX || 1}
                                    scaleY={pathProps.scaleY || 1}
                                    rotation={layer.props.rotation}
                                    opacity={layer.props.opacity}
                                    listening={false}
                                    perfectDrawEnabled={false}
                                />
                            ))}
                        </React.Fragment>
                    );
                }
                return (
                    <Path
                        key={layer.id || index}
                        x={layer.props.x}
                        y={layer.props.y}
                        data={pathProps.data || ''}
                        fill={layer.props.fill}
                        stroke={pathProps.stroke}
                        strokeWidth={pathProps.strokeWidth}
                        scaleX={pathProps.scaleX !== undefined ? pathProps.scaleX : (layer.props.width / 24)}
                        scaleY={pathProps.scaleY !== undefined ? pathProps.scaleY : (layer.props.height / 24)}
                        rotation={layer.props.rotation}
                        opacity={layer.props.opacity}
                        listening={false}
                        perfectDrawEnabled={false}
                    />
                );

            case 'Image':
                const imageSrc = (layer.props as any).src;
                return (
                    <URLImage
                        key={layer.id || index}
                        src={imageSrc}
                        {...baseProps}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <Stage
            width={width}
            height={height}
            scaleX={scale}
            scaleY={scale}
            listening={false}
        >
            <Layer listening={false}>
                {renderBackground()}
                {template.layers.map((layer, index) => renderLayer(layer, index))}
            </Layer>
        </Stage>
    );
}
