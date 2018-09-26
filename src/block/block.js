/**
 * BLOCK: aos
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import lodash from 'lodash';

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody } = wp.components;

let aos = '';

const addDropdownControls = createHigherOrderComponent( BlockEdit => {
	return props => {
		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody>
						<p>AOS Attribute</p>
						<select
							onChange={ e => {
								aos = e.target.value;
							} }
						>
							<option value="fade-in">Fade in</option>
							<option value="fade-out">Fade out</option>
						</select>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withInspectorControl' );

wp.hooks.addFilter(
	'editor.BlockEdit',
	'my-plugin/with-inspector-controls',
	addDropdownControls
);

function addAosAttribute( props ) {
	return lodash.assign( props, { 'data-aos': aos } );
}

wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'my-plugin/add-background-color-style',
	addAosAttribute
);
