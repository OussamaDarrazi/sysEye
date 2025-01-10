FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    zip \
    unzip \
    libonig-dev \
    curl \
    libcurl4-openssl-dev \
    pkg-config \
    libssl-dev

# Install PHP extensions
RUN docker-php-ext-install pdo mbstring

# Install MongoDB PHP extension
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy application files
COPY . .

# Install Laravel dependencies (including mongodb/laravel-mongodb)
RUN composer require mongodb/laravel-mongodb

# Set up permissions for Laravel
RUN chown -R www-data:www-data /var/www && chmod -R 775 storage bootstrap/cache

# Add Laravel Scheduler to Cron
RUN echo "* * * * * www-data php /var/www/artisan schedule:run >> /dev/null 2>&1" > /etc/cron.d/laravel-scheduler \
    && chmod 0644 /etc/cron.d/laravel-scheduler \
    && crontab /etc/cron.d/laravel-scheduler



# Expose application port
EXPOSE 8000

# Start Laravel's development server
# Start cron and the PHP built-in server
CMD ["sh", "-c", "service cron start && php -S 0.0.0.0:8000 -t public"]
