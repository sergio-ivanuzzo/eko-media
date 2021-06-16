import { FormattedMessage } from "react-intl";
import React from "react";

import Download from "~/components/icons/Download";
import { FileLink } from "~/components/core/DownloadLink/styles";

const DownloadLink = ({ filePath, fileName }: IDownloadLinkProps): JSX.Element => {
    return (
        <FileLink href={filePath} download={fileName} title={fileName}>
            <FormattedMessage id="download_link.text" />
            <Download width={20} />
        </FileLink>
    );
};

export default DownloadLink;
