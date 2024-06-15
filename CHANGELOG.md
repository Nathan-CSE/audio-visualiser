
# Changelog
 
## [b1.0.0] - 2024-06-15
 
Added first changelog, working on MVP goals at the moment. 

Currently, users are able to add YouTube URLs to the visualiser and see the frequencies. They are able to control playback for the current video via the provided controls, including video seeking, video duration and volume. They are also able to view the title of the video and the user that posted it. There is also a basic options menu that allows users to customise the appearance of the visualiser.

### Added
- Basic queue functionality, allowing users to queue videos which are automatically played when the current video ends.
 
### Changed
- `package.json` for React hot reload.

### Fixed
- Issue where adding a new video to the queue would cause the page to refresh.
- Issue where videos were not playing automatically.
- Issue where videos were not being queued properly.