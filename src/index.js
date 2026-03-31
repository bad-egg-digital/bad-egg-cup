import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import {
  createRoot,
  useState,
  useEffect,
} from '@wordpress/element';

import {
  Panel,
  PanelBody,
  PanelRow,
  TextareaControl,
  ToggleControl,
  FontSizePicker,
  Button,
  __experimentalHeading as Heading,
} from '@wordpress/components';

const useSettings = () => {
  const [ message, setMessage ] = useState('Hello, World!');
  const [ display, setDisplay ] = useState(true);
  const [ size, setSize ] = useState('medium');

  useEffect( () => {
    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      setMessage( settings.badeggcup.message );
      setDisplay( settings.badeggcup.display );
      setSize( settings.badeggcup.size );
    } );
  }, [] );

  const saveSettings = () => {
      apiFetch( {
        path: '/wp/v2/settings',
        method: 'POST',
        data: {
          badeggcup: {
            message,
            display,
            size,
          },
        },
      } );
  };

  return {
      message,
      setMessage,
      display,
      setDisplay,
      size,
      setSize,
      saveSettings,
  };
};

const MessageControl = ( { value, onChange } ) => {
  return (
    <TextareaControl
      label={ __( 'Message', 'badeggcup' ) }
      value={ value }
      onChange={ onChange }
      __nextHasNoMarginBottom
    />
  );
};

const DisplayControl = ( { value, onChange } ) => {
  return (
    <ToggleControl
        label={ __( 'Display', 'badeggcup' ) }
        checked={ value }
        onChange={ onChange }
        __nextHasNoMarginBottom
    />
  );
};

const SizeControl = ( { value, onChange } ) => {
  return (
    <FontSizePicker
      fontSizes={[
        {
          name: __( 'Small', 'badeggcup' ),
          size: 'small',
          slug: 'small',
        },
        {
          name: __( 'Medium', 'badeggcup' ),
          size: 'medium',
          slug: 'medium',
        },
        {
          name: __( 'Large', 'badeggcup' ),
          size: 'large',
          slug: 'large',
        },
        {
          name: __( 'Extra Large', 'badeggcup' ),
          size: 'x-large',
          slug: 'x-large',
        },
      ]}
      value={ value }
      onChange={ onChange }
      disableCustomFontSizes={ true }
    />
  );
};

const SaveButton = ( { onClick } ) => {
  return (
    <Button variant="primary" onClick={ onClick } __next40pxDefaultSize>
      { __( 'Save', 'badeggcup' ) }
    </Button>
  );
};

const SettingsTitle = () => {
  return (
    <Heading level={ 1 }>
      { __( 'Website Options', 'badeggcup' ) }
    </Heading>
  );
};

const OptionsPage = () => {

  const {
    message,
    setMessage,
    display,
    setDisplay,
    size,
    setSize,
    saveSettings,
  } = useSettings();

  return (
    <>
      <SettingsTitle />
      <Panel>
        <PanelBody>

          <PanelRow>
            <MessageControl
              value={ message }
              onChange={ ( value ) => setMessage( value ) }
            />
          </PanelRow>
          <PanelRow>
            <DisplayControl
              value={ display }
              onChange={ ( value ) => setDisplay( value ) }
            />
          </PanelRow>
        </PanelBody>
        <PanelBody
            title={ __( 'Appearance', 'badeggcup' ) }
            initialOpen={ false }
        >
            <PanelRow>
              <SizeControl
                value={ size }
                onChange={ ( value ) => setSize( value ) }
              />
            </PanelRow>
        </PanelBody>
      </Panel>
      <SaveButton onClick={ saveSettings } />
    </>
  );
};

domReady( () => {
    const root = createRoot(
        document.getElementById( 'badeggcup-options' )
    );

    root.render( <OptionsPage /> );
} );
