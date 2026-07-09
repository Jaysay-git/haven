# Haven Local static Web Server
# Run this to host the platform locally on http://localhost:3000

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:3001/")
try {
    $listener.Start()
    Write-Host "Haven local preview server started."
    Write-Host "Point your web browser to: http://localhost:3001"
    Write-Host "Press Ctrl+C in this terminal window to stop the server."
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        
        $urlPath = $req.Url.LocalPath
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        
        # Build local path
        $cleanedPath = $urlPath.Substring(1).Replace("/", [System.IO.Path]::DirectorySeparatorChar)
        $filePath = Join-Path $PSScriptRoot $cleanedPath
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Map Content-Type
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "text/plain"
            if ($ext -eq ".html") { $contentType = "text/html; charset=utf-8" }
            elseif ($ext -eq ".css") { $contentType = "text/css; charset=utf-8" }
            elseif ($ext -eq ".js") { $contentType = "application/javascript; charset=utf-8" }
            elseif ($ext -eq ".png") { $contentType = "image/png" }
            elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg") { $contentType = "image/jpeg" }
            elseif ($ext -eq ".svg") { $contentType = "image/svg+xml" }
            elseif ($ext -eq ".json") { $contentType = "application/json; charset=utf-8" }
            
            $res.ContentType = $contentType
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $res.StatusCode = 404
            $res.ContentType = "text/plain"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("File Not Found: $urlPath")
            $res.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $res.Close()
    }
} catch {
    Write-Error $_
} finally {
    $listener.Stop()
}
