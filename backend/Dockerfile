FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www

ENV COMPOSER_ALLOW_SUPERUSER=1
# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    zip \
    unzip \
    libonig-dev \
    curl \
    libcurl4-openssl-dev \
    pkg-config \
    libssl-dev \
    cron

# Install PHP extensions
RUN docker-php-ext-install pdo mbstring

# Install MongoDB PHP extension
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy application files
COPY . .

# Install Laravel dependencies (including mongodb/laravel-mongodb)
RUN composer require mongodb/laravel-mongodb --no-scripts 

# Add Laravel Scheduler to Cron
RUN echo "* * * * * cd /var/www && /usr/local/bin/php artisan schedule:run >> scheduler.log" > /etc/cron.d/laravel-scheduler
RUN chmod 0644 /etc/cron.d/laravel-scheduler
RUN crontab /etc/cron.d/laravel-scheduler

# Set proper permissions
RUN chown -R www-data:www-data /var/www
RUN chmod -R 775 storage bootstrap/cache


# Expose application port
EXPOSE 8000

# Start Laravel's development server
CMD ["sh", "-c", "service cron start && php artisan serve --host=0.0.0.0 --port=8000"]