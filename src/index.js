import './index.scss';

import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

import {
  createRoot,
  useState,
  useEffect,
} from '@wordpress/element';

import {
  Panel,
  PanelBody,
  CheckboxControl,
  Button,
  __experimentalHeading as Heading,
  NoticeList,
} from '@wordpress/components';

const useSettings = () => {
  const [ supportDefaultPost, setSupportDefaultPost ] = useState( false );
  const [ supportPostRewrite, setSupportPostRewrite ] = useState( false );
  const [ supportPostTag, setSupportPostTag ] = useState( false );
  const [ supportPostCategory, setSupportPostCategory ] = useState( false );
  const [ supportComments, setSupportComments ] = useState( false );
  const { createSuccessNotice } = useDispatch( noticesStore );

  useEffect( () => {
    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      setSupportDefaultPost( settings.badeggcup.supportDefaultPost );
      setSupportPostRewrite( settings.badeggcup.supportPostRewrite );
      setSupportPostTag( settings.badeggcup.supportPostTag );
      setSupportPostCategory( settings.badeggcup.supportPostCategory );
      setSupportComments( settings.badeggcup.supportComments );
    } );
  }, [] );

  const saveSettings = () => {
    apiFetch( {
      path: '/wp/v2/settings',
      method: 'POST',
      data: {
        badeggcup: {
          supportDefaultPost,
          supportPostRewrite,
          supportPostTag,
          supportPostCategory,
          supportComments,
        }
      },
    }).then( () => {
      createSuccessNotice(
        __( 'Settings saved.', 'badeggcup' )
      );
    });
  };

  return {
      supportDefaultPost,
      setSupportDefaultPost,
      supportPostRewrite,
      setSupportPostRewrite,
      supportPostTag,
      setSupportPostTag,
      supportPostCategory,
      setSupportPostCategory,
      supportComments,
      setSupportComments,
      saveSettings,
  };
};

const Notices = () => {
  const { removeNotice } = useDispatch( noticesStore );
  const notices = useSelect( ( select ) =>
    select( noticesStore ).getNotices()
  );

  if ( notices.length === 0 ) {
      return null;
  }

  return <NoticeList notices={ notices } onRemove={ removeNotice } />;
};

const OptionsPage = () => {

  const {
    supportDefaultPost,
    setSupportDefaultPost,
    supportPostRewrite,
    setSupportPostRewrite,
    supportPostTag,
    setSupportPostTag,
    supportPostCategory,
    setSupportPostCategory,
    supportComments,
    setSupportComments,
    saveSettings,
  } = useSettings();

  return (
    <>
      <Notices />

      <Heading level={ 1 }>
        { __( 'Website Options', 'badeggcup' ) }
      </Heading>

      <Panel>
        <PanelBody title={ __('Theme Support', 'badeggcup') } className="badeggcup-theme-supports">
          <CheckboxControl
            label={ __( 'Default Post Type', 'badeggcup' ) }
            checked={ supportDefaultPost }
            onChange={ ( value => {
              setSupportDefaultPost( value );

              if(!value) {
                setSupportPostRewrite(false);
                setSupportPostCategory(false);
                setSupportPostTag(false);
              }
            } ) }
            __nextHasNoMarginBottom
          />

          {
            (supportDefaultPost) ? (
              <>
                <CheckboxControl
                  label={ __( 'Post Rewrites', 'badeggcup' ) }
                  checked={ supportPostRewrite }
                  onChange={ ( value => setSupportPostRewrite( value ) ) }
                  __nextHasNoMarginBottom
                />
                <CheckboxControl
                  label={ __( 'Post Tags', 'badeggcup' ) }
                  checked={ supportPostTag }
                  onChange={ ( value => setSupportPostTag( value ) ) }
                  __nextHasNoMarginBottom
                />
                <CheckboxControl
                  label={ __( 'Post Categories', 'badeggcup' ) }
                  checked={ supportPostCategory }
                  onChange={ ( value => setSupportPostCategory( value ) ) }
                  __nextHasNoMarginBottom
                />
              </>
            ) : null
          }

          <CheckboxControl
            label={ __( 'Comments', 'badeggcup' ) }
            checked={ supportComments }
            onChange={ ( value => setSupportComments( value ) ) }
            __nextHasNoMarginBottom
          />
        </PanelBody>
      </Panel>

      <Button variant="primary" onClick={ saveSettings } __next40pxDefaultSize>
        { __( 'Save', 'badeggcup' ) }
      </Button>
    </>
  );
};

domReady( () => {
    const root = createRoot(
        document.getElementById( 'badeggcup-options' )
    );

    root.render( <OptionsPage /> );
} );
