import * as React from 'react'
import { t, AppLocale } from '../../lib/i18n'
import { RadioGroup } from '../lib/radio-group'

interface ILanguageProps {
  readonly selectedLocale: AppLocale
  readonly onLocaleChanged: (locale: AppLocale) => void
}

const localeOptions: ReadonlyArray<AppLocale> = ['en', 'es']

export class Language extends React.Component<ILanguageProps> {
  private onLocaleChanged = (locale: AppLocale) => {
    this.props.onLocaleChanged(locale)
  }

  private renderLocaleLabel = (locale: AppLocale) => {
    switch (locale) {
      case 'en':
        return <>{t('english')}</>
      case 'es':
        return <>{t('spanish')}</>
    }
  }

  public render() {
    return (
      <div className="language-preferences-section">
        <h2>{t('languageSelection')}</h2>
        <p className="language-description">{t('languageDescription')}</p>
        <RadioGroup<AppLocale>
          selectedKey={this.props.selectedLocale}
          radioButtonKeys={localeOptions}
          onSelectionChanged={this.onLocaleChanged}
          renderRadioButtonLabelContents={this.renderLocaleLabel}
        />
      </div>
    )
  }
}
